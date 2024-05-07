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

        const data = await response.json();

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

export const myProfile = async (token) => {

    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    
      try {
        const response = await fetch(`${root}users/profile`, options)
      
        const data = await response.json()
     
        if (!data.success) {
          throw new Error(data.message)
        }
    
        return data.data
    
      } catch (error) {
        return error
      }

}

export const updateProfile = async (token , user) => {
    
    const options = {
        
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
       
      }
    
      try {
        
        const response = await fetch(`${root}users/profile`, options)
        
       
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.message)
        }
    
        return data
    
      } catch (error) {
        return error
      }

}
export const getAllTables = async (token) => {

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }
    try {
        const response = await fetch(`${root}tables`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}