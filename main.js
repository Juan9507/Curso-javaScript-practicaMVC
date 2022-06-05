/**
 * Juego de Ping Pong de Código Facilito MVC
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */

/**
 * Función anonima para declarar una clase Board (tablero) que seria el modelo
 */
(function () {
  /**
   * self - se usa para siempre tener la referencia original del objeto
   * de este modo es como si estubiera declarando una clase
   * @param {*} width - recibe como parametro el ancho
   * @param {*} height - recibe como parametro el largo
   */
  self.Board = function (width, height) {
    this.width = width; //Ancho
    this.height = height; // Alto
    this.playing = false; //Jugando
    this.game_over = false; //Fin del juego
    this.bars = []; // Barra de las orillas del juego
    this.ball = null; // Pelota
  };

  /**
   * Modificación del prototipo de la clase para colocar los metodos de la misma
   */
  self.Board.prototype = {
    get elements() {
      //Modificar los metodos de las clases
      var elements = this.bars; // Barra laterales del juego
      elements.push(this.ball); // Agregar una pelota
      return elements; // Retorna todos los elementos que hay en el tablero.
    },
  };
})();

/**
 * Función anonima auto ejecutable para declarar una clase Bar la vista
 */
(function () {
  /**
   *Clase bar para saber la posicion y ancho y el largo
   * @param {*} x - recibe la cordenada x
   * @param {*} y - recibe la cordenada y
   * @param {*} width - recibe el tamaño
   * @param {*} height - recibe el alto
   * @param {*} bars - recibe el bars tablero
   */
  self.Bar = function (x, y, width, height, board) {
    //Constructor de la clase
    this.x = x; //Cordenada x
    this.y = y; //Cordenada y
    this.width = width; //Ancho
    this.height = height; //Alto
    this.board = board; //Tablero
    this.board.bars.push(this); // Agregando al tablero las barras laterales
    this.kind = "rectangle"; // Atributo para saber lo que se va a dibujar para que canvas sepa que dibuja
    this.speed = 10; // Velocidad para mover las barras
  };

  /**
   * Modificación del prototipo de la clase para colocar los metodos de la misma
   * Metodos para mover las barras
   */
  self.Bar.prototype = {
    down: function () {
      //Movernos para abajo
      this.y += this.speed;
    },
    up: function () {
      // Movernos hacia abajo
      this.y -= this.speed;
    },
    toString: function () {
      return `x: ${this.x} y: ${this.y}`;
    },
  };
})();
/**
 * Función anonima para declarar una clase BoardView la vista
 */
(function () {
  /**
   * Creando la clase
   * @param {*} canvas - Recibe como parametro el canvas
   * @param {*} board - Recibe como parametro el objeto Board
   */
  self.BoardView = function (canvas, board) {
    this.canvas = canvas; // Elemento canvas
    this.canvas.width = board.width; // Ancho del elemento canvas
    this.canvas.height = board.height; // alto del elemento canvas
    this.board = board; // board
    this.ctx = canvas.getContext("2d"); // Contexto para poder dibujar
  };

  self.BoardView.prototype = {
    draw: function () {
      for (var index = this.board.elements.length - 1; index >= 0; index--) {
        var el = this.board.elements[index];
        draw(this.ctx, el); //Se le pasa el contexto y el elemento que va a dibujar
      }
    },
  };

  /**
   * Funcion draw para dibujar
   * @param {*} ctx
   * @param {*} element
   */
  function draw(ctx, element) {
    if (element != null && element.hasOwnProperty("kind")) {
      switch (
        element.kind //dependiendo de lo que traiga el elemento se dibuja
      ) {
        case "rectangle":
          ctx.fillRect(element.x, element.y, element.width, element.height);
          break;
        default:
          break;
      }
    }
  }
})();

var board = new Board(800, 400); //Creando un objeto de la clase board
var bar = new Bar(20, 100, 40, 100, board); // Creando un objeto de la clase bar
var bar2 = new Bar(735, 100, 40, 100, board); // Creando un objeto de la clase bar
var canvas = document.querySelector("#canvas"); //Seleccionar el elemento canvas
var board_view = new BoardView(canvas, board); //Creando un objeto de la clase boardView

/**
 * Escuchar cuando pulsan una tecla para saber el evento a lanzar
 */
document.addEventListener("keydown", function (ev) {
  if (ev.key == "ArrowUp") {
    bar.up();
  } else if (ev.key == "ArrowDown") {
    bar.down();
  }
  console.log(bar.toString());
});

window.addEventListener("load", main);

/**
 * Function main para ejecutar todos los elementos
 */
function main() {
  board_view.draw();
}
