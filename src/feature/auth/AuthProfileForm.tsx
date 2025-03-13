import { Input } from "@/components/ui/input";
import CustomButton from "../custom/CustomButton";
import useRequiredAuth from "./useRequiredAuth";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import getUserLabel from "../user/getUserLabel";

export default function AuthProfileForm () {
  const auth = useRequiredAuth()
  const [label, setLabel] = useState(() => {
    return getUserLabel({ user: auth.user })
  })
  useEffect(() => {
    const label = getUserLabel({ user: auth.user })
    setLabel(label)
  }, [auth.user])
  function handleLabelChange (event: ChangeEvent<HTMLInputElement>) {
    setLabel(event.target.value)
  }
  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await auth.update({ i: { displayName: label } })
  }
  return(
    <form onSubmit={handleSubmit}>
      <Input onChange={handleLabelChange} value={label} />
      <CustomButton type='submit'>Update</CustomButton>
    </form>
  )
}