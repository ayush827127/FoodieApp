import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const UpdateProfile = () => {
  const { register, handleSubmit } = useForm();
  const { updateUserProfile } = useContext(AuthContext);

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoUrl = data.photoUrl;
    updateUserProfile(name, photoUrl)
      .then((result) => {
        alert("Profile Updated");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>

            <input
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              {...register("photoUrl")}
            />

            {/* TODO: Uplodaing image will be later */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
