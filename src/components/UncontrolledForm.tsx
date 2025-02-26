import { FormEvent, useRef, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

export type FormData = CreateFormData | EditFormData;

export type CreateFormData = {
  title: string;
  note: string;
  estimatedCount: number;
};

export type EditFormData = {
  title: string;
  note: string;
  actualCount: number;
  estimatedCount: number;
};

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

const UncontrolledForm = (props: FormProps) => {
  const { mode, handleFormData } = props;
  const [showNote, setShowNote] = useState(false);

  const estimatedCountRef = useRef<HTMLInputElement>();

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

  const handleIncrementInput = () => {
    console.log("estimatedCountRef", estimatedCountRef.current);
    if (estimatedCountRef.current) {
      estimatedCountRef.current.value = incrementEstimatedCount(
        Number(estimatedCountRef.current.value)
      ).toString();
    }
  };

  const handleDecrementInput = () => {
    estimatedCountRef.current.value = decrementEstimatedCount(
      Number(estimatedCountRef.current.value)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("e", e, "formData", formData, "formObject", data);
    handleFormData(data);
    // if ('actualCount' in data) handleFormData(data);
    // else if (!('actualCount' in data)) handleFormData(data as CreateFormData); // ??
  };

  const initialValues =
    "initialValues" in props
      ? props.initialValues
      : {
          title: "",
          note: "",
          estimatedCount: 1,
        };

  return (
    <Box component="form" id={props.id} onSubmit={handleSubmit}>
      <Box sx={{ py: 1 }}>
        <InputBase
          // name={validateNameType('title')} -- TODO dodac tu funkcje walidujaca name jako pole obiektu FormData
          name="title"
          defaultValue={initialValues.title}
          sx={{
            width: "100%",
            fontSize: "22px",
            fontWeight: 700,
            fontStyle: "italic",
            color: "rgb(85, 85, 85)",
          }}
          placeholder="What are you working on?"
          // value={data.title}
          // onChange={createTextHandler("title")}
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
          {mode === "create" ? "Est Pomodoros" : "Act / Est Pomodoros"}
        </InputLabel>

        {/* {"actualCount" in initialValues && ( // type guard: in - blad znika */}
        {mode === "edit" && (
          <>
            <InputBase
              id="actual-count"
              name="actualCount"
              defaultValue={
                "actualCount" in initialValues && initialValues.actualCount // moze byc false
              }
              type="number"
              sx={{
                width: "75px",
                p: 1.25,
                backgroundColor: "rgb(239, 239, 239)",
                borderRadius: "6px",
                fontWeight: 700,
                color: "rgb(187, 187, 187)",
              }}
              inputProps={{ min: 0, max: 99 }}
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
          name="estimatedCount"
          defaultValue={initialValues.estimatedCount}
          type="number"
          sx={{
            width: "75px",
            backgroundColor: "rgb(239, 239, 239)",
            mr: 1.25,
            p: 1.25,
            borderRadius: "6px",
            color: "rgb(85, 85, 85)",
            fontWeight: 700,
          }}
          inputProps={{ min: 0, max: 99, ref: estimatedCountRef }}
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
            defaultValue={initialValues.note}
            sx={{
              width: "100%",
              px: 1.75,
              py: 1.25,
              borderRadius: "6px",
              backgroundColor: "rgb(239, 239, 239)",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default UncontrolledForm;
