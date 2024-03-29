import React from "react";
import { useGlobalContext } from "./context/context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

function Output({}) {
  const {
    emissionData,
    legs,
    isDropdownOpen,
    setIsDropdownOpen,
    totalPassengers,
  } = useGlobalContext();

  const navigate = useNavigate();

  return (
    <OutputContainer
      as={motion.div}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <GeneralData
        multipleOutput={
          emissionData && emissionData.legs.length > 1
        }
      >
        <Total>
          <span>total C02:</span>
          {emissionData && emissionData.co2e.toFixed(2)}
          {emissionData && emissionData.co2e_unit}
        </Total>
        <Individual>
          <span>C02/passengers: </span>

          {emissionData &&
            (
              emissionData.co2e /
              (totalPassengers / legs.length)
            ).toFixed(2)}
          {emissionData && emissionData.co2e_unit}
        </Individual>
      </GeneralData>
      <Recap
        multipleOutput={
          emissionData && emissionData.legs.length > 1
        }
      >
        <div className="recap-logo">recap:</div>
        <div className="recap-container">
          <div className="recap-from-to">
            <span>flight:</span>
            {`${legs[0].from} - ${legs[0].to}`}
          </div>
          <div className="recap-class">
            <span>class:</span> {`${legs[0].class}`}
          </div>
          <div className="recap-passengers">
            <span>n. passengers:</span>
            {`${legs[0].passengers}`}
          </div>
        </div>
      </Recap>

      <MultiFlight
        multipleOutput={
          emissionData && emissionData.legs.length > 1
        }
      >
        {emissionData &&
          emissionData.legs.map((item, i) => (
            <IndividualFlight
              key={i}
              onClick={() => {
                setIsDropdownOpen((prevState) =>
                  prevState.map((item, index) =>
                    index === i ? !item : false
                  )
                );
              }}
            >
              <div className="emission-header">
                <span className="">
                  recap. flight {i + 1}
                </span>
                {`${legs[i].from} - ${legs[i].to}`}
              </div>

              <Dropdown
                index={i}
                isDropdownOpen={isDropdownOpen}
                className={`dropdown `}
              >
                <div className="left ">
                  <div className=" left-total ">
                    <span>total:</span>
                    {emissionData.legs[i].co2e.toFixed(2)}
                    {emissionData.legs[i].co2e_unit}
                  </div>
                  <div className="left-individual ">
                    <span>individual:</span>
                    {(
                      emissionData.legs[i].co2e /
                      legs[i].passengers
                    ).toFixed(2)}
                    {emissionData
                      ? emissionData.co2e_unit
                      : ""}
                  </div>
                </div>
                <div className="right  ">
                  <div className=" class  ">
                    <span>class:</span>
                    {`${legs[i].class}`}
                  </div>
                  <div className="passengers ">
                    <span>n. passengers:</span>
                    {`${legs[i].passengers}`}
                  </div>
                </div>
              </Dropdown>
            </IndividualFlight>
          ))}
      </MultiFlight>

      <Button
        as={motion.button}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
          duration: 2,
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        close
      </Button>
    </OutputContainer>
  );
}
const Button = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
  padding: 0.4rem 0.5rem;
  color: #fff;
  text-transform: capitalize;
  cursor: pointer;
  border: none;
  -webkit-box-shadow: 8px 8px 15px -3px #000000;
  box-shadow: 8px 8px 15px -3px #000000;
  @media (min-width: 1020px) {
    padding: 10px 20px;
  }
`;

const OutputContainer = styled.div`
  position: absolute;
  color: #000;
  text-transform: capitalize;
  background-color: rgba(225, 215, 198, 0.2);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0%,
    rgba(101, 84, 51, 0.586) 100%
  );
  backdrop-filter: blur(12px);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: 500ms;
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;
const GeneralData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  transition: 500;
  overflow: visible;
  @media (min-width: 1024px) {
    width: 30%;
  }
`;
const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2rem;
  position: relative;
  background-color: #f8f4ea;
  border-radius: 0.5rem;
  -webkit-box-shadow: 8px 8px 15px -3px #000000;
  box-shadow: 8px 8px 15px -3px #000000;
  @media (min-width: 768px) {
    height: 3rem;
    padding: 0.75rem;
  }
`;
const Total = styled(Data)``;
const Individual = styled(Data)``;
const Recap = styled(Data)`
  width: 80%;
  height: fit-content;
  @media (min-width: 1024px) {
    width: 30%;
    height: 200px;
  }
  ${(props) =>
    props.multipleOutput &&
    css`
      display: none;
    `};
  .recap-logo {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
  }
  .recap-container {
    margin: 0.75rem 0;
    width: 50%;
    @media (min-width: 1024px) {
      width: 60%;
    }
  }
  .recap-from-to,
  .recap-class,
  .recap-passengers {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const MultiFlight = styled.div`
  display: none;
  overflow: visible;
  width: 80%;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
  @media (min-width: 1024px) {
    width: 30%;
  }
  ${(props) =>
    props.multipleOutput &&
    css`
      display: flex;
    `};
`;

const IndividualFlight = styled.div`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: #f8f4ea;
  cursor: pointer;
  -webkit-box-shadow: 8px 8px 15px -3px #000000;
  box-shadow: 8px 8px 15px -3px #000000;
  transition: 400ms ease-in-out;
  .emission-header {
    padding: 0.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Dropdown = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 0.5rem;
  height: 0;

  transition: opacity 200ms, height 300ms 50ms;
  opacity: ${(props) =>
    props.isDropdownOpen[props.index] ? 1 : 0};

  height: ${(props) =>
    props.isDropdownOpen[props.index] ? "4em" : 0};
  .left {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .left-total,
  .left-individual {
    display: flex;
    align-items: center;
    gap: 0.5;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.5rem;
  }
  .class,
  .passengers {
    display: flex;
    gap: 0.5rem;
  }
`;
export default Output;
