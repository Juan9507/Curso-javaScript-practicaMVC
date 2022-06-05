/**
 * Juego de Ping Pong de Código Facilito
 *
 * @author [Juan David Rivera Naranjo - juandavidnaranjo75@gmail.com]
 * @version [v1.0.0]
 * @since [v1.0.0]
 */

/**
 * Función anonima para declarar una clase Board
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
    this.bars = []; // Barra
    this.ball = null; // Pelota
  };

  /**
   * Modificación del prototipo de la clase para colocar los metodos de la misma
   */
  self.Board.prototype = {
    get elements() {
      //Modificar los metodos de las clases
      var elements = this.bars; // Barra laterales del juego
      elements.push(ball); // Agregar una pelota
      return elements; // Retorna todos los elementos que hay en el tablero.
    },
  };
})();

/**
 * Función anonima para declarar una clase BoardView
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
})();

window.addEventListener("load", main);

/**
 * Function main para ejecutar todos los elementos
 */
function main() {
  var board = new Board(800, 400); //Creando un objeto de la clase board
  var canvas = document.querySelector("#canvas"); //Seleccionar el elemento canvas
  var board_view = new BoardView(canvas, board); //Creando un objeto de la clase boardView
}
