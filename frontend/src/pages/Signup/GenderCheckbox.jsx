import React from "react";

function GenderCheckbox({ onCheckboxChange, selectedgender }) {
  return (
    <div className="flex gap-3">
      {/* <div>
          <div className="form-control">
            <label className={`lable gap-2 cursor-pointer`}>
                <span className="label-text">Male</span>
                <input type="checkbox" className=' checkbox border-slate-600 ' />
            </label>
        </div> 
     <div className="form-control">
            <label className={`lable gap-2 cursor-pointer`}>
                <span className="label-text">Female</span>
                <input type="checkbox" className=' checkbox border-slate-600 ' />
            </label>
        </div> 
     </div> */}

      <div className="form-control">
        <label
          className={`cursor-pointer label ${
            selectedgender === "male" ? "seleted" : ""
          }`}
        >
          <span className="label-text pr-1">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-600 "
            checked={selectedgender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label
          className={`cursor-pointer label ${
            selectedgender === "female" ? "seleted" : ""
          }`}
        >
          <span className="label-text p-1">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-600 "
            checked={selectedgender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckbox;
