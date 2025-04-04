import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {logoutUser as signout}  from '../../store/authSlice'

export default function AdminHeader({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutUser = async () => {
    const response = await dispatch(signout())
    console.log(response.data);
    if (response?.data?.success) navigate("/auth/login");
  };
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center cursor-pointer rounded-md px-4 py-2 text-sm font-medium shadow"
          onClick={() => logoutUser()}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
