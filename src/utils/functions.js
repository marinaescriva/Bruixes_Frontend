export const validacion = (type, value) => {

    switch (type) {
        case "nombre":
            if (value.length < 3) {
                return "el nombre debe ser mas largo";
            }
            return "";

        case "email":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailRegex.test(value)) {
                return "añade un email válido";
            }
            return "";

            case "password":

            if (value.length < 6 ) {
            return "contraseña no válida"
            }

            return "";

        default:
            console.log("función de validación");
       
    }

}