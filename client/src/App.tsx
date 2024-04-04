import './App.css'
import { Input, Button } from "@material-tailwind/react";

const InputComponent:React.ForwardRefExoticComponent<any> = Input;

function App() {
  return (
    <>
      <div className="text-3xl font-bold underline m-20">
        Higway Delight
      </div>
      <InputComponent
        label="Name"
        className="mt-100"
      />
    </>
  )
}

export default App
