import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { myProfile } from "../../services/apiCalls";
import {decodeToken} from  'react-jwt';

// import { getMyOwnPost, deletePost } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
// import { CButtonCreate } from "../../common/CbutttonCreate/CbuttonCreate";
// import { CinputProfile } from '../../common/CinputProfile/CinputProfile';
// import { validation } from "../../utils/functions";
import { CInput } from "../../common/CInput/Cinput";
// import { ClinkPost } from "../../common/Clink/Clink";

export const Profile = () => {

  const navigate = useNavigate();
  const state = useSelector(userData);
  const rdxUser = useSelector(userData);
  const dispatch = useDispatch();
  const [criteria, setCriteria] = useState("")
  const token = rdxUser?.credenciales?.token


  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [state])

  useEffect(() => {
    if (criteria !== "") {
     
      dispatch(updateCriteria(criteria))
    }
  }, [criteria])

  const searchHandler = (e) => {
    setCriteria(e.target.value)
  }

  const [user, setUser] = useState({
    nombre: "",
    email: "",
   
  })

  const [userError, setUserError] = useState({
    nombreError: "",
    emailError: ""
  })

  const [msgError, setMsgError] = useState("");

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     setUser((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const checkError = (e) => {
//     const error = validation(e.target.name, e.target.value);

//     setUserError((prevState) => ({
//       ...prevState,
//       [e.target.name + "Error"]: error,
//     }));
//   };


//   useEffect(() => {

//     if (!token) {
//       navigate("/")

//     }

//   }, [token])

  useEffect(() => {
    const getmyProfile = async () => {
      try {

        const fetched = await myProfile(token)

        setUser({
          name: fetched.name,
          email: fetched.email,
        })

        setLoadedData(true)

      } catch (error) {
        console.log(error)

      }
    }
    getmyProfile()
  }, [token, loadedData])


//   const updateData = async () => {

//     try {

//       const updatedUser = {
//         ...user,
//         name: user.name
//       }
//       const fetched = await updateProfile(token, updatedUser)

//       setUser((prevState) => ({
//         ...prevState,
//         name: fetched.name || prevState.name,
//         email: fetched.email || prevState.email
//       }));

//       setWrite("disabled")

//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   const [myPosts, setMyPosts] = useState([]);

//   useEffect(() => {

//     const getMyOwnPostInfo = async (token) => {


//       try {
//         const fetched = await getMyOwnPost(token)

//         setMyPosts(fetched) //? quite .data
//         const newPosts = setMyPosts.data

//       } catch (error) {
//         console.log(error)
//       }
//     }

//     if (token) {
//       getMyOwnPostInfo(token);
//     }
//   }, [])


//   const deletingPosts = async (postId) => {

//     try {

//       const fetched = await deletePost(postId, token)

//       if (fetched.success) {
//         setMyPosts(posts.filter(item => item._id !== postId))

//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }


  return (
    <>
      <div className="profileDesign">

        {/* <ClinkPost
          path={"/post"}
          title={"new post"}>
        </ClinkPost> */}
        <>

          <div className="edit-profile">
            <CInput
              type="text"
              name="name"
              placeholder="name"
              value={user.name || ""}
              disabled={write}
              functionChange={(e) => inputHandler(e)}
              functionBlur={(e) => checkError(e)}
            />
            <div className='error'>{userError.nameError}</div>

            <CInput
              type="email"
              name="email"
              placeholder="email"
              value={user.email || ""}
              disabled={"disabled"}
              functionChange={(e) => inputHandler(e)}
              functionBlur={(e) => checkError(e)}

            />
            <div className='error'>{userError.emailError}</div>

            <CButton
              className={write === "" ? "CButtonDesign2 CButtonDesign" : "CButtonDesign"}
              title={write === "" ? "Confirm" : "Edit"}
              functionEmit={write === "" ? updateData : () => setWrite("")}
            />

          </div>

        </>
        <div>
          {loadedData && myPosts.length > 0

            ? (
              myPosts.map(post => {
                const arrayLikes = post.likes
                return (

                  <div key={post.id} className='profile-pannel'>

                    <div className='card-title-profile'>{post.title}</div>
                    <div className='card-text-profile'>{post.text} </div>
                    <div >{post.image && <img className='card-img-profile' src={post.image} alt="posts image"></img>}</div>
                    <div className='card-text-profile'>{arrayLikes.length} </div>
                    <div className='card-nick-profile'>{post.nick} </div>
                    <div className="deleteSection-profile">

                      <CButton
                        className={'CButtonDesign'}
                        title={`Delete post `}
                        functionEmit={() => deletingPosts(post._id)}
                      />
                    </div>
                  </div>
                )
              })

            ) : (

              <div>No hay posts </div>
            )}
        </div>

      </div>
    </>
  )
}