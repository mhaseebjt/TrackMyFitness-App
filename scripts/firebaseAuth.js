import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const signUpUser = async ({
  email,
  password,
  height,
  weight,
  fitnessGoal,
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user.uid;

  // Save additional user info to Firestore
  await setDoc(doc(db, "users", uid), {
    email,
    height: Number(height),
    weight: Number(weight),
    fitnessGoal,
    createdAt: new Date(),
  });
};
