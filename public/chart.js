let sim = 0;
let nao = 0;
let abstencao = 0;

const socket = io.connect();
socket.on('voto_sim', (valor) => {
  sim = valor
  updateChart()
})

socket.on('voto_nao', (valor) => {
  nao = valor
  updateChart()
})

socket.on('voto_abster', (valor) => {
  abstencao = valor
  updateChart()
})

socket.on('limpar', (valor) => {
  sim = valor
  nao = valor
  abstencao = valor
  updateChart()
})

function updateChart() {

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {



    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['SIM', Number(sim)],
      ['NÃO', Number(nao)],
      ['ABSTENÇÃO', Number(abstencao)],
    ]);

    // Set chart options
    var options = {
      'title': 'Gráfico da votação',
      'width': 500,
      'height': 300
    };

    // Desenha o grafico de pizza e passa as configuracoes do grafico tambem
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    // Desenha o grafico de barras e passa as configuracoes do grafico tambem
    // var chart2 = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
    // chart2.draw(data, options);
  }

}

