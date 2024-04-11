import {
  Select as SelectTailwind,
  Option as OptionTailwind,
} from "@material-tailwind/react";

const Option: React.FC<any> = OptionTailwind;
const Select: React.ForwardRefExoticComponent<any> = SelectTailwind;

//interfaces
import type { SelectOption } from "../interfaces/authInterface";

interface SelectOptionProps {
  optionsArr: SelectOption[];
  handleSelectChange: (optionChoosed: string) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  optionsArr,
  handleSelectChange,
}) => {
  return (
    <Select variant="standard" label="Contact Mode">
      {optionsArr.map((option: any, index: number) => (
        <Option key={index} onClick={() => handleSelectChange(option.value)}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectOption;
