"use client"

import type React from "react"

// Adapted from: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/use-toast.ts
import { useEffect, useState } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
      id: string
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      id: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      id: string
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.id ? { ...t, ...action.toast } : t)),
      }

    case actionTypes.DISMISS_TOAST: {
      const { id } = action

      if (toastTimeouts.has(id)) {
        clearTimeout(toastTimeouts.get(id))
        toastTimeouts.delete(id)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }

    case actionTypes.REMOVE_TOAST:
      if (toastTimeouts.has(action.id)) {
        clearTimeout(toastTimeouts.get(action.id))
        toastTimeouts.delete(action.id)
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      }

    default:
      return state
  }
}

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] })

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = generateId()

    const newToast: ToasterToast = {
      id,
      ...props,
      open: true,
    }

    setState((prevState) => reducer(prevState, { type: actionTypes.ADD_TOAST, toast: newToast }))

    return id
  }

  const update = (id: string, props: Partial<ToasterToast>) => {
    setState((prevState) => reducer(prevState, { type: actionTypes.UPDATE_TOAST, id, toast: props }))
  }

  const dismiss = (id: string) => {
    setState((prevState) => reducer(prevState, { type: actionTypes.DISMISS_TOAST, id }))
  }

  useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.open) {
        const timeout = setTimeout(() => {
          setState((prevState) => reducer(prevState, { type: actionTypes.DISMISS_TOAST, id: toast.id }))
        }, 5000)

        toastTimeouts.set(toast.id, timeout)
      }

      if (!toast.open && toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          setState((prevState) => reducer(prevState, { type: actionTypes.REMOVE_TOAST, id: toast.id }))
        }, TOAST_REMOVE_DELAY)

        toastTimeouts.set(toast.id, timeout)
      }
    })

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout))
      toastTimeouts.clear()
    }
  }, [state.toasts])

  return {
    toasts: state.toasts,
    toast,
    update,
    dismiss,
  }
}
