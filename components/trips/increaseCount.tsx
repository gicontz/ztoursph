import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { set } from "lodash";

const IncreaseCount = ({ number = 1, onChange }) => {
  const [count, setCount] = useState(number);
  
  const handleCount = (op: '+' | '-') => {
    const newCount = op === '+' ? count + 1 : count - 1;
    if (newCount < 1) return;
    setCount(newCount);
    onChange(newCount);
  };

  return (
    <div className="flex items-center h-fit w-fit gap-2">
      <PlusOutlined
        onClick={handleCount.bind(null, '+')}
        twoToneColor="#787878"
      />
      <h2 className="select-none">{count}</h2>
      <MinusOutlined
        onClick={handleCount.bind(null,'-')}
        twoToneColor="#787878"
      />
    </div>
  );
};

export default IncreaseCount;
