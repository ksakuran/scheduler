import React from "react";
import { waitForElement, fireEvent, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryAllByText, queryByAltText} from "@testing-library/react";
import { render, cleanup } from "@testing-library/react";
import { getByText } from "@testing-library/react"
import { prettyDOM } from "@testing-library/react";
import axios from "__mocks__/axios";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
   
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment,"Save"));
    expect(getByText(appointment,"Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day,"no spots remaining")).toBeInTheDocument();
    
    
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application/>);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    await waitForElement(() => getByText(container, /Are you sure you would like to delete?/i))
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    
    await waitForElement(() => queryByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1. Render application
    const { container } = render(<Application />);
    //2. Wait for correct name to be displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. Click the edit button for that appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //4. Change the value of the student name input
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //5. Select interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6. Click save button
    fireEvent.click(getByText(appointment, "Save"));
    //7. Confirm saving component shows
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //8. Confirm that the new edited name appears in the show component
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //9. Find the daylist component with the value of Monday
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    //10. Check spots are still at 1
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //1.render
    const { container } = render(<Application />);
    //2. wait for element with name
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. create appointment container
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //4. click the edit icon
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //5. change the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6. click save button
    fireEvent.click(getByText(appointment, "Save"));
    //7. wait for element with error to render
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    //8. click close
    fireEvent.click(queryByAltText(appointment, "Close"));
    //9. goes back to previous screen with save button
    expect(getByText(appointment, "Save")).toBeInTheDocument();
    //10. click cancel  
    fireEvent.click(queryByText(appointment, "Cancel"))
    //11. expect name not to be changed after failed save changes
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
    //12. check that spots remaining is still 1.
    const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    //1.render
    const { container } = render(<Application />);
    //2. wait for element with name
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. create appointment container
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //4. click the delete icon
    fireEvent.click(queryByAltText(appointment, "Delete"))
    //5. check for confirm message
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    //6. click confirm
    fireEvent.click(queryByText(appointment, "Confirm"))
    //7. check for deleting status component
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    //8. wait for error component and check if its there
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    //9. find monday and check that spots havent changed
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
