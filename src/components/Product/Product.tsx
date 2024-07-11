import React, { useEffect, useState } from "react";

import { initMercadoPago, 
  // Wallet
 } from "@mercadopago/sdk-react";

export const Product: React.FC = () => {
  initMercadoPago("APP_USR-f246badc-7f43-4d1c-b9e2-f9252d1cfa9f", {
    locale: "es-AR"
  });

  const [products, setProducts] = useState<any[]>([]);
  // const [preferenceIds, setPreferenceIds] = useState(null);


  //https://mockbin.io

  const fetchProducts = async () => {
    try {
      // const res = await fetch(
      //   // "https://api-feed-digital-g9he.onrender.com/api/courses"
      //   "http://localhost:8080/api/courses", {
      //     mode: 'no-cors'
      //   }
      // );
      // console.log(res)
      const res = await fetch("https://api-feed-digital-g9he.onrender.com/api/courses");
      const response = await res.json();
      console.log(response.data);
      if (!response.length) setProducts([]);
      else setProducts(response);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // const createPreference = async (prod: any) => {
  //   try {
  //       const body = {
  //           title: prod.name,
  //           quantity: 1,
  //           price: prod.price
  //       }
  //       const res = await fetch("http://localhost:8080/create-preference", {
  //           method: "POST",
  //           body: JSON.stringify(body),
  //           headers:{'Content-Type': 'application/json'}
  //       })
  //       const response = await res.json();
  //       console.log('response api', response);
  //       const { id } = response;
  //       return id;
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }
  //! éste metodo tenemos que aplicarselo a todos los productos.. como hacemos?
  //!--> updatePreferenceIds

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const updatePreferenceIds = async () => {
      // const ids = {};
      //va a recorrer el array de products
      // for (const prod of products) {
        //por cada uno va a llamar al meodo createPreference
        // const preferenceId = await createPreference(prod);
        //y va a agregar en el objeto como propiedad el id del producto y como valor el preferenceId que 
        //generó el servidor.
        //{1: "sdfsfdf", 2: "dsfsdfdgggg"}
        // ids[prod.id] = preferenceId;
      //   console.log('ids', ids);
      // }
      // setPreferenceIds(ids);
    };

    if (products.length > 0) {
      updatePreferenceIds();
    }
    // console.log(preferenceIds);
  }, [products]);


  return (
    <>
    a
      {/* <img src="https://picsum.photos/200/300?random=1" alt="No image" />
      <h3>Producto 1</h3>
      <p>$100</p>
      <button>Comprar</button>
      <br />- */}
      {products &&  
        products.map((prod) => {
          return (
            <>
              <img src={prod.image} alt="no img" />
              <h3>{prod.name}</h3>
              <p>${prod.price}</p>
              {
            // preferenceIds &&    
              // <Wallet
                // initialization={{ preferenceId: preferenceIds[prod.id]  }}    //datos del producto que van al servidor
                                                                        //nuestro servidor va a recibir estos datos
                                                                        //y nos va a devolver un id,
                                                                        //para eso vamos a crear un endpoint en el back
                                                                        ///que va a hacer esto, entonces nosotros
                                                                        //desde aca llamamos a ese post y le pasamos los 
                                                                        //datos del producto
                                                                        //!--> createPreference
                // customization={{ texts: { valueProp: "smart_option" } }}
              // />
              }
            </>
          );
        })}
    </>
  );
};

