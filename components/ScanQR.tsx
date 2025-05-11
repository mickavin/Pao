import { useState } from "react";
import {
    Scanner,
    useDevices,
    outline,
    boundingBox,
    centerText,
  } from "@yudiel/react-qr-scanner";
  
  const styles = {
    container: {
      width: 400,
      margin: "auto",
    },
    controls: {
      marginBottom: 8,
    },
  };
  
function parseDataMatrix(code: string) {
const result: { gtin?: string, serial?: string, lot?: string, expiry?: string } = {};
const AIs = {
    '01': { key: 'gtin', length: 14, fixed: true },
    '17': { key: 'expiry', length: 6, fixed: true },
    '10': { key: 'lot', fixed: false },
    '21': { key: 'serial', fixed: false },
};

// Nettoyer les caractères spéciaux initiaux
if (code.startsWith("]d2")) {
    code = code.slice(3); // supprime ']d2'
}

let i = 0;
while (i < code.length) {
    const ai = code.slice(i, i + 2);
    i += 2;

    if (!(ai in AIs)) {
    // AI non reconnu, on arrête ou on ignore
    break;
    }

    const { key, length, fixed } = AIs[ai];

    if (fixed) {
    result[key] = code.slice(i, i + length);
    i += length;
    } else {
    let end = code.indexOf("\x1D", i); // cherche le séparateur
    if (end === -1) end = code.length; // si pas trouvé, fin de la chaîne
    result[key] = code.slice(i, end);
    i = end + 1;
    }
}

// Formatage de la date
if (result.expiry) {
    const d = result.expiry;
    result.expiry = `20${d.slice(0, 2)}-${d.slice(2, 4)}-${d.slice(4, 6)}`;
}

return result;
}


export default function Scanqr({ setData }: { setData: (data: string) => void }) {
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
    const [tracker, setTracker] = useState<string | undefined>("centerText");
    const [pause, setPause] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    function getTracker() {
      switch (tracker) {
        case "outline":
          return outline;
        case "boundingBox":
          return boundingBox;
        case "centerText":
          return centerText;
        default:
          return undefined;
      }
    }
  
    const handleScan = async (data: string) => {
      setPause(true);
      try {
        const parsedData = parseDataMatrix(data);
        setParsedData(parsedData);
        setData(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setPause(false);
      }
    };
  
    return (
      <div>
        {parsedData && (
          <div>
            <p>GTIN: {parsedData.gtin}</p>
            <p>Serial: {parsedData.serial}</p>
            <p>Lot: {parsedData.lot}</p>
            <p>Expiry: {parsedData.expiry}</p>  
          </div>
        )}
        <Scanner
          formats={[
            "qr_code",
            "micro_qr_code",
            "rm_qr_code",
            "maxi_code",
            "pdf417",
            "aztec",
            "data_matrix",
            "matrix_codes",
            "dx_film_edge",
            "databar",
            "databar_expanded",
            "codabar",
            "code_39",
            "code_93",
            "code_128",
            "ean_8",
            "ean_13",
            "itf",
            "linear_codes",
            "upc_a",
            "upc_e",
          ]}
          constraints={{
            deviceId: deviceId,
          }}
          onScan={(detectedCodes) => {
            handleScan(detectedCodes[0].rawValue);
          }}
          onError={(error) => {
            console.log(`onError: ${error}'`);
          }}
          classNames={{
            container: 'qrscan',
            video: 'aspect-square w-full h-full object-cover',
          }}
          styles={{ container: { height: "400px", width: "350px" }, finderBorder: 20 }}
          components={{
            onOff: true,
            torch: true,
            zoom: true,
            finder: true,
            tracker: getTracker(),
          }}
          allowMultiple={true}
          scanDelay={2000}
          paused={pause}
        />
      </div>
    );
  }