import React, { useState } from 'react';

import { COLORS, TYPOGRAPHY } from '../../../helpers/constants/design-system';

import ApproveIcon from '../icon/approve-icon.component';
import Identicon from '../identicon/identicon.component';
import { ChipWithInput } from './chip-with-input';

import README from './README.mdx';

import Chip from '.';

export default {
  title: 'Components/UI/Chip',
  id: __filename,
  component: Chip,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    leftIcon: {
      control: {
        type: 'select',
      },
      options: ['ApproveIcon'],
      mapping: {
        ApproveIcon: <ApproveIcon size={24} color="#4cd964" />,
      },
    },
    rightIcon: {
      control: {
        type: 'select',
      },
      options: ['Identicon'],
      mapping: {
        Identicon: (
          <Identicon
            address="0x5CfE73b6021E818B776b421B1c4Db2474086a7e1"
            diameter={25}
          />
        ),
      },
    },
    label: {
      control: 'text',
    },
    labelProps: {
      color: {
        control: {
          type: 'select',
        },
        options: Object.values(COLORS),
      },
      variant: {
        color: {
          control: {
            type: 'select',
          },
          options: Object.values(TYPOGRAPHY),
        },
      },
    },
    borderColor: {
      control: {
        type: 'select',
      },
      options: Object.values(COLORS),
    },
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: Object.values(COLORS),
    },
    children: {
      control: 'text',
    },
  },
};

export const DefaultStory = (args) => <Chip {...args} />;

DefaultStory.storyName = 'Default';

DefaultStory.args = {
  label: 'Chip',
  borderColor: COLORS.UI3,
  backgroundColor: COLORS.UI1,
  labelProps: {
    color: COLORS.BLACK,
    variant: TYPOGRAPHY.H6,
  },
};

export const WithLeftIcon = () => (
  <Chip
    label="Done!"
    borderColor={COLORS.SUCCESS3}
    leftIcon={<ApproveIcon size={24} color="#4cd964" />}
  />
);

export const WithRightIcon = () => (
  <Chip
    label="0x5CfE73b6021E818B776b421B1c4Db2474086a7e1"
    borderColor={COLORS.UI4}
    rightIcon={
      <Identicon
        address="0x5CfE73b6021E818B776b421B1c4Db2474086a7e1"
        diameter={25}
      />
    }
  />
);

export const WithBothIcons = () => (
  <Chip
    label="Account 1"
    borderColor={COLORS.UI4}
    rightIcon={
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.45759 0.857142C9.45759 0.785714 9.42188 0.705357 9.3683 0.651785L8.92188 0.205357C8.8683 0.151785 8.78795 0.116071 8.71652 0.116071C8.64509 0.116071 8.56473 0.151785 8.51116 0.205357L5.00223 3.71429L1.4933 0.205357C1.43973 0.151785 1.35938 0.116071 1.28795 0.116071C1.20759 0.116071 1.13616 0.151785 1.08259 0.205357L0.636161 0.651785C0.582589 0.705357 0.546875 0.785714 0.546875 0.857142C0.546875 0.928571 0.582589 1.00893 0.636161 1.0625L4.79688 5.22321C4.85045 5.27679 4.9308 5.3125 5.00223 5.3125C5.07366 5.3125 5.15402 5.27679 5.20759 5.22321L9.3683 1.0625C9.42188 1.00893 9.45759 0.928571 9.45759 0.857142Z"
          fill="#24292E"
        />
      </svg>
    }
    leftIcon={
      <Identicon
        address="0x5CfE73b6021E818B776b421B1c4Db2474086a7e1"
        diameter={25}
      />
    }
  />
);
export const WithInput = (args) => {
  const [inputValue, setInputValue] = useState('Chip with input');
  return (
    <ChipWithInput
      {...args}
      inputValue={inputValue}
      setInputValue={setInputValue}
    />
  );
};

WithInput.args = {
  borderColor: COLORS.UI3,
};
