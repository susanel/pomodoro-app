import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Typography from "@mui/material/Typography";

import { camelize } from "../utils/camelize";

type FormMode = "create" | "edit";

export type FormData = CreateFormData | EditFormData;

export interface CreateFormData {
  title: string;
  note: string;
  estimatedCount: number;
}

export interface EditFormData {
  title: string;
  note: string;
  actualCount: number;
  estimatedCount: number;
}

export interface FormConfig {
  formData: FormData;
  mode: FormMode;
}

type FormProps =
  | {
      id: string;
      mode: "create";
      handleFormData: (newState: CreateFormData) => void;
    }
  | {
      id: string;
      mode: "edit";
      initialValues: EditFormData;
      handleFormData: (newState: EditFormData) => void;
    };

const incrementEstimatedCount = (count: number) => {
  if (count >= 99) return count;
  if (count < 1) {
    const nr = parseFloat((count + 0.1).toFixed(1));
    return nr;
  }
  return count + 1;
};

const decrementEstimatedCount = (count: number) => {
  if (count <= 0) return count;
  if (count <= 1) {
    const nr = parseFloat((count - 0.1).toFixed(1));
    return nr;
  }
  return count - 1;
};

const initialValues = {
  title: "",
  note: "",
  estimatedCount: 1,
  actualCount: 1,
} as const;

const Form = (props: FormProps) => {
  const [showNote, setShowNote] = useState(false);
  const [data, setData] = useState(
    props.mode === "create" ? initialValues : props.initialValues
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const formattedName = camelize(name);

    setData((old) => ({
      ...old,
      [formattedName]: type === "number" ? Number(value) : value,
    }));
  };

  const handleIncrementInput = () => {
    setData((old) => ({
      ...old,
      estimatedCount: incrementEstimatedCount(old.estimatedCount),
    }));
  };

  const handleDecrementInput = () => {
    setData((old) => ({
      ...old,
      estimatedCount: decrementEstimatedCount(old.estimatedCount),
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    props.handleFormData(data);
  }

  return (
    <Box component="form" id={props.id} onSubmit={handleSubmit}>
      <Box sx={{ py: 1 }}>
        <InputBase
          name="title"
          sx={{
            width: "100%",
            fontSize: "22px",
            fontWeight: 700,
            fontStyle: "italic",
            color: "rgb(85, 85, 85)",
          }}
          placeholder="What are you working on?"
          value={data.title}
          onChange={handleChange}
        ></InputBase>
      </Box>
      <Box sx={{ py: 1 }}>
        <InputLabel
          shrink
          sx={{
            color: "rgb(85, 85, 85)",
            fontWeight: 700,
            fontSize: "1rem",
          }}
        >
          {props.mode === "create" ? "Est Pomodoros" : `Act \/ Est Pomodoros`}
        </InputLabel>

        {props.mode === "edit" && (
          <>
            <InputBase
              id="actual-count"
              name="actual-count"
              type="number"
              value={data.actualCount}
              sx={{
                width: "75px",
                p: 1.25,
                backgroundColor: "rgb(239, 239, 239)",
                borderRadius: "6px",
                fontWeight: 700,
                color: "rgb(187, 187, 187)",
              }}
              inputProps={{ min: 0, max: 99 }}
              onChange={handleChange}
            ></InputBase>
            <Typography
              variant="body1"
              component="span"
              sx={{ mx: 0.75, color: "rgb(170, 170, 170)" }}
            >
              /
            </Typography>
          </>
        )}

        <InputBase
          id="estimated-count"
          name="estimated-count"
          type="number"
          value={data.estimatedCount}
          sx={{
            width: "75px",
            backgroundColor: "rgb(239, 239, 239)",
            mr: 1.25,
            p: 1.25,
            borderRadius: "6px",
            color: "rgb(85, 85, 85)",
            fontWeight: 700,
          }}
          onChange={handleChange}
        ></InputBase>
        <IconButton
          variant="outlined"
          sx={{ mr: "4px" }}
          onClick={handleIncrementInput}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton variant="outlined" onClick={handleDecrementInput}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>

      <Box sx={{ py: 1 }}>
        {!showNote && (
          <Button
            variant="text"
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              color: "rgb(136, 136, 136)",
              fontWeight: 700,
              textDecoration: "underline",
            }}
            onClick={() => {
              setShowNote(!showNote);
            }}
          >
            + Add Note
          </Button>
        )}
        {showNote && (
          <InputBase
            name="note"
            value={data.note}
            sx={{
              width: "100%",
              px: 1.75,
              py: 1.25,
              borderRadius: "6px",
              backgroundColor: "rgb(239, 239, 239)",
            }}
            onChange={handleChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default Form;
