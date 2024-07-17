import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./../src/components/Note";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };
  /* Primer test
  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
  */
  /* Segundo test
  // Almacenamos render en un contenedor llamado container
  const { container } = render(<Note note={note} />)

  // Tomamos el selector .note para obtener el contenido por medio de .querySelector
  const div = container.querySelector('.note')

  // Validamos si el texto se encuentra
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  */
  /* Tercer test
  render(<Note note={note} />)
  screen.debug()

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
  */

  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
