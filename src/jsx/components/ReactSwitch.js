import React, { useState } from "react";
import Switch from "react-switch";

export default function SwitchBotton(){
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
      setChecked(nextChecked);
    };
  
    return (
      <div className="example">
       
        <label>
          <span className="text-font-style">Google Adds:</span>
          <Switch
            onChange={handleChange}
            checked={checked}
            className="react-switch"
          />
        </label>
      </div>
    );
  };