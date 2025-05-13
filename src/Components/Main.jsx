import { useEffect, useRef, useState } from "react";

const Main = () => {
  const getRanNumarr = () => {
    return new Array(10).fill(0).map((item, index) => ({
      value: Math.round(Math.random() * 6),
      isHeld: false,
      id: index,
    }));
  };

    const [buttonsNum, setButtonsNum] = useState(() => getRanNumarr());
    const buttonRef = useRef(null);

  const gameWon =
    buttonsNum.every((die) => die.isHeld) &&
    buttonsNum.every((die) => die.value === buttonsNum[0].value);

    useEffect(() => {
        if (gameWon) {
          buttonRef.current.focus();
        }
    },[gameWon])
    
    const handelBtn = (e) => {
        const Id = e.target.id;
        
        setButtonsNum((prevNum) => {
            return prevNum.map((die) => {
                return die.id == Id
                ? {
                    ...die,
                    isHeld: !die.isHeld,
                }
                : die;
            });
        });
    };
    
    const handelNumRoll = () => {
        if(!gameWon){
        setButtonsNum((oldNum) =>
            oldNum.map((die) =>
                die.isHeld
                    ? die
                    : {
                        ...die,
                        value: Math.round(Math.random() * 6),
                    }
            )
        );
        } else {
            
            setButtonsNum(getRanNumarr())
    }
};

  return (
    <main>
      <div>
        {buttonsNum.map((item) => {
          return (
            <button
              key={item.id}
              onClick={handelBtn}
              id={item.id}
              style={{ backgroundColor: `${item.isHeld ? "green" : "white"}` }}
            >
              {item.value}
            </button>
          );
        })}
      </div>
      <button ref={buttonRef} id="roll" onClick={handelNumRoll}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
};

export default Main;
