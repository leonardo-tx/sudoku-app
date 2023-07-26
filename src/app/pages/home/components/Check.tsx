import { IconButton } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { JSX, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import validateAtom from "../atoms/validateAtom";

export default function Check(): JSX.Element {
    const [validate, setValidate] = useAtom(validateAtom);

    useEffect(() => {
        if (validate) setValidate(false);
    }, [validate, setValidate]);

    return (
        <IconButton 
            aria-label="Checa todas as células"
            icon={<FaCheck />}
            onClick={() => setValidate(true)}
        />
    );
}