import React, { useEffect, useState } from 'react'
import '../styles/PlansScreen.css'
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from "../features/counter/userSlice"
import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { loadStripe } from "@stripe/stripe-js"

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {

    //const q = query(collection(db, "products"),where('active','==', true));
    //const products = {};
    //const querySnapshot = getDocs(q);
    


    db.collection('products')
    .where('active', '==', true)
    .get()
    .then((querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) =>{
        products[productDoc.id] = productDoc.data();
        const priceSnap = await productDoc.ref.collection
        ('prices').get();
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) =>{
    const docRef = await db.collection('customers')
    .doc(user.uid).collection("checkout_sessions")
    .add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })

    docRef.onSnapshot(async(snap) => {
      const { error, sessionId } = snap.data();

      if (error){
        alert(`An error occured: ${error.message}`);
      }

      if(sessionId){
        const stripe = await loadStripe('pk_test_51OBpezDYfQJWHOLgOdDVaOaEliZcm7iJbaLnNjWfNDysPirfUf5nJuqt4xPo3BGJ8KCDSBCfyufFN58dOYGL86wi00GXdfdJqa')
        stripe.redirectToCheckout({ sessionId })
      };
    })
  };
  
  return (
    <div className='plansScreen'>
      {Object.entries(products).map(([productId, productData]) => {
        return(
          <div className='plansScreen__plan'>
            <div className='plansScreen__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.price?.priceId)}>Subscribe</button>
          </div>
        );
      })}
    </div>
  )
}

export default PlansScreen