import { useState, useEffect } from "react";
import diagnoseService from "./../../services/diagnoses";
import { Diagnosis } from "../../types";

const Diagnose = ({ code }:{ code:string }) => { 

    const [diagnose, setDiagnose] = useState<Diagnosis | undefined>(undefined);

    useEffect(() => {

        const fetchDiagnose = async (code: string): Promise<void> => {
            const diagnose:Diagnosis | undefined = await diagnoseService.findByCode(code);
            setDiagnose(diagnose);
        };
        void fetchDiagnose(code as string);

    }, []);

    if(!diagnose){
        return null;
    } else {
        return(<>{code} {diagnose.name}</>);
    }

};

export default Diagnose;