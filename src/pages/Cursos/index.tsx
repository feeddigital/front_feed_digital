import React, { useEffect, useState } from "react";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Button, Container } from "@mui/material";

export const Cursos: React.FC<{}> = () => {
  initMercadoPago("APP_USR-f246badc-7f43-4d1c-b9e2-f9252d1cfa9f", {
    locale: "es-AR",
  });

  const [products, setProducts] = useState<any[]>([]);
  const [preferenceIds, setPreferenceIds] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://api-feed-digital2.vercel.app/api/courses"
      );
      const response = await res.json();
      console.log(response.data);
      if (response.data.length === 0) setProducts([]);
      else setProducts(response.data);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const createPreference = async (studentId: any, course: any) => {
    try {
      console.log(course);
      const body = {
        title: course.name,
        quantity: 1,
        price: course.price,
      };
      // const res = await fetch(`https://api-feed-digital2.vercel.app/api/courses/pay-ok/${studentId}/course/${course._id}`, {
      const res = await fetch(
        `http://localhost:8080/api/courses/pay-ok/${studentId}/course/${course._id}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await res.json();
      console.log("response api", response);
      const { data } = response;
      return data.responseMP.id;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePreferenceIds = async () => {
    const ids: any = {};
    for (const prod of products) {
      const studentId = "668fcc5fd2999af2de125860"; //! TIENE QUE SACAR EL ID DEL USUARIO LOGUEADO
      const preferenceId = await createPreference(studentId, prod);
      //va a agregar en el objeto como propiedad el id del producto y como valor el preferenceId que
      //generó el servidor.
      //{1: "sdfsfdf", 2: "dsfsdfdgggg"}
      ids[prod._id] = preferenceId;
      console.log("ids", ids);
    }
    setPreferenceIds(ids);
  };

  useEffect(() => {
    if (products.length === 0) fetchProducts();
    if (products.length > 0) updatePreferenceIds();
  }, [products]);

  return (
    <>
      <Container sx={{ mt: 9 }} maxWidth="xl">
        <Button variant="contained">Hola</Button>
      </Container>
      {/* <img src="https://picsum.photos/200/300?random=1" alt="No image" />
      <h3>Producto 1</h3>
      <p>$100</p>
      <button>Comprar</button>
      <br />- */}
      {products &&
        products.map((prod) => {
          return (
            <>
              {/* <img src={prod.image} alt="no img" /> */}
              <h3>{prod.name}</h3>
              {prod.price ? <p>${prod.price}</p> : null}
              {<h3>Inicia: {prod.startDate.description}</h3>}
              {<h3>Termina: {prod.endDate.description}</h3>}
              {preferenceIds && (
                <Wallet
                  initialization={{ preferenceId: preferenceIds[prod._id] }} //datos del producto que van al servidor
                  
                />
              )}
            </>
          );
        })}
    </>
  );
};
