import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    // Verificar si el UID del usuario está presente.
    if (!uid) {
        throw new Error('El UID del usuario no existe');
    }

    // Crear una referencia a la colección de notas específica del usuario en Firestore.
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    try {
        // Obtener documentos de la colección.
        const docs = await getDocs(collectionRef);

        // Inicializar un array para almacenar las notas.
        const notes = [];

        // Iterar sobre los documentos y agregarlos al array de notas.
        docs.forEach(doc => {
            notes.push({ id: doc.id, ...doc.data() });
        });

        // Devolver el array de notas.
        return notes;
    } catch (error) {
        // Manejar cualquier error durante el proceso y lanzar una nueva excepción.
        throw new Error(`Error al cargar las notas: ${error.message}`);
    }
};
