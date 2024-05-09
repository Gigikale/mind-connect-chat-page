import Cookies from 'js-cookie';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        profilePicture: ''
      });

      const updateUser = (userData) => {
        setUser({
            firstName: userData["firstName"],
            lastName: userData["lastName"],
            profilePicture: userData["photo"]
          });
        localStorage.setItem('user', JSON.stringify(userData));
      };

    const [ token, setToken ] = useState(null);
    const [ emailAddress, setEmailAddress ] = useState(null);
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const [ photo, setPhoto ] = useState(null);

    const saveToken = (token) => {
        setToken(token)
        Cookies.set("token", token, {
            secure: true
        })
    }

    const saveEmailAddress = (emailAddress) => {
        setEmailAddress(emailAddress)
        Cookies.set("emailAddress", emailAddress, {
            secure: true
        })
    }

    const saveFirstName = (firstName) => {
        setFirstName(firstName)
        Cookies.set("firstName", firstName, {
            secure: true
        })
    }

    const saveLastName = (lastName) => {
        setLastName(lastName)
        Cookies.set("lastName", lastName, {
            secure: true
        })
    }

    const savePhoto = (photo) => {
        setPhoto(photo)
        Cookies.set("photo", photo, {
            secure: true
        })
    }

    const logout = () => {
        setToken(null)
        Cookies.remove("token")

        setEmailAddress(null)
        Cookies.remove("emailAddress")

        setFirstName(null)
        Cookies.remove("firstName")

        setLastName(null)
        Cookies.remove("lastName")

        setPhoto(null)
        Cookies.remove("photo")
    }

    const contextValues = {
        token: token ?? Cookies.get("token"),
        firstName: firstName ?? Cookies.get("firstName"),
        lastName: lastName ?? Cookies.get("lastName"),
        emailAddress: emailAddress ?? Cookies.get("emailAddress"),
        photo: photo ?? Cookies.get("photo"),
        setToken: saveToken,
        setEmailAddress: saveEmailAddress,
        setLastName: saveLastName,
        setFirstName: saveFirstName,
        setPhoto: savePhoto,
        user,
        updateUser,
        logout,
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
    
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

    return (
        <AuthContext.Provider value={ contextValues }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext