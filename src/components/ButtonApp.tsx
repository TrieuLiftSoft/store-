import {
 
  Button,
  
} from "@nextui-org/react";
import {  useState } from "react";

 const ButtonApp = ({title}:{title:string}) => {
  const [isLoadingButton, setIsLoadingButton] = useState(true);
  const handleButtonAdd = () => {
    setIsLoadingButton(false);
    setTimeout(() => {
      setIsLoadingButton(true);
    }, 1000);
  };
  return (

    <>
      {isLoadingButton ? (
        <Button color="primary" variant="shadow" onClick={handleButtonAdd}>
        {title}
        </Button>
      ) : (
        <Button color="primary" variant="shadow" isLoading></Button>
      )}
   </>
  );
}
export default ButtonApp;
