const root = "http://localhost:4000/api/"

export const loginUser = async (credenciales) => {

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credenciales)
        }

        const response = await fetch(`${root}auth/login`, options);
        console.log(response, "response")
        const data = await response.json();
        console.log(data, "data")
        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error

    }
}
export const registerUser = async (user) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

try {
    const response = await fetch(`${root}auth/register`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message)
        }
        return data;
    } catch (error) {
        return error

}
}

