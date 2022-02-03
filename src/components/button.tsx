import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import "@components/button.sass";

type pageNavigationFunctionType = (direction: string) => void;

type Props = {
  direction: string;
  handleEvent: pageNavigationFunctionType;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ direction, handleEvent, children }) => {
  const currentIndex = useSelector((state: RootState) => state.posts.paginationIndex);
  const endIndex = useSelector((state: RootState) => state.posts.paginationEndIndex);

  const isClickDisabled =
    (direction === "next" && currentIndex === endIndex) ||
    (direction === "prev" && currentIndex === 0);

  return (
    <div id="button">
      <button
        onClick={() => handleEvent(direction)}
        disabled={isClickDisabled}
        data-testid={`${direction}-button`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
