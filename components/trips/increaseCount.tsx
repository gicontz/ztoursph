import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const IncreaseCount = ({ number = 1, onChange }) => {
  const [count, setCount] = useState(number);
  onChange(count);
  return (
    <div className="flex items-center h-fit w-fit gap-2">
      <PlusOutlined
        onClick={() => setCount((prev) => ++prev)}
        twoToneColor="#787878"
      />
      <h2 className="select-none">{count}</h2>
      <MinusOutlined
        onClick={() => setCount((prev) => --prev)}
        twoToneColor="#787878"
      />
    </div>
  );
};

export default IncreaseCount;
