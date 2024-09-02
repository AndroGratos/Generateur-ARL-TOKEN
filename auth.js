import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const auth = getAuth();
const firestore = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const role = userData.role || 'user';
            localStorage.setItem('role', role);
        }
    } else {
        window.location.href = "login.html";
    }
});
