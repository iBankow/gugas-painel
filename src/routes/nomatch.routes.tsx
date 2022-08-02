import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NoMatchProps {
    to: string
}

const NoMatch = ({ to }: NoMatchProps) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

export { NoMatch }