export const MainView = () => {
  const row = document.querySelector(".row");

  const h1Col = document.createElement("div");
  h1Col.classList.add("col-md-3", "pt-5");

  const h4 = document.createElement("h4");
  h4.textContent = "Juego de Ping Pong";

  const instrucciones = document.createElement("p");
  instrucciones.textContent = "Intrucciones del juego";

  const instruccionesOne = document.createElement("p");
  instruccionesOne.textContent =
    "1 -> El juego se arranca y se pausa con la tecla espacio";

  const instruccionesTwo = document.createElement("p");
  instruccionesTwo.textContent =
    "2 -> la barra izquierda se mueve con las teclas de w y s";

  const instruccionesThree = document.createElement("p");
  instruccionesThree.textContent =
    "3 -> la barra derecha se mueve con las teclas de arriba y abajo";

  h1Col.append(h4);
  h1Col.append(
    instrucciones,
    instruccionesOne,
    instruccionesTwo,
    instruccionesThree
  );
  row.append(h1Col);
};

MainView();
