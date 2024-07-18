import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC<{}> = () => {
    return (
        <>
            <h3>Nuestros cursos disponibles</h3>
            <br />
            <Link to ={"/cursos"}>
                <Button variant="contained">Ver Cursos</Button>
            </Link>
        </>
    )
}