import { cardList } from "./ListCard";

export const getPrevCardId= (currentCardId) =>{
    console.log("entrando a prev card")
    const currentIndex = cardList.findIndex((card) => card._id === currentCardId);

    if (currentIndex !== -1) {
      const prevIndex = currentIndex - 1;
  
      if (prevIndex >= 0) {
        return cardList[prevIndex];
      }
    }
  
    return null;
}

export const getNextCardId = (currentCardId) => {
    const currentIndex = cardList.findIndex((card) => card._id === currentCardId);

    if (currentIndex !== -1) {
      const nextIndex = currentIndex + 1;
  
      if (nextIndex < cardList.length) {
        return cardList[nextIndex];
      }
    }
  
    return null;
  };