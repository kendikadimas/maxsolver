let matrixOrder = 3; // Default ordo matriks

// Membuat elemen input untuk matriks
function createMatrixInputs(tableId) {
  const table = document.getElementById(tableId);
  table.querySelector('tbody').innerHTML = ''; // Hapus isi tabel sebelumnya
  for (let i = 0; i < matrixOrder; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrixOrder; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      // input.value = 0;
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.querySelector('tbody').appendChild(row);
  }
}

// Mendapatkan matriks dari input
function getMatrix(tableId) {
  const inputs = document.querySelectorAll(`#${tableId} input`);
  const matrix = [];
  let isValid = true; // Flag untuk mengecek validitas input

  inputs.forEach((input, index) => {
    const row = Math.floor(index / matrixOrder);
    if (!matrix[row]) matrix[row] = [];
    const value = input.value.trim(); // Hapus spasi berlebih

    if (value === '') {
      isValid = false; // Tandai jika ada input kosong
    }
    matrix[row].push(Number(value) || 0); // Tambahkan nilai atau 0 sebagai fallback
  });

  if (!isValid) {
    alert('Semua input harus diisi sebelum melakukan operasi perhitungan.');
    return null; // Hentikan jika ada input kosong
  }

  return matrix;
}

// Menampilkan hasil matriks
function displayResult(matrix) {
  const resultTable = document.getElementById('resultMatrix');
  resultTable.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    resultTable.querySelector('tbody').appendChild(row);
  }
}

// Operasi Matriks
function addMatrices() {
  const A = getMatrix('matrixA');
  const B = getMatrix('matrixB');
  if (!A || !B) return; // Hentikan jika input tidak valid

  const result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
  displayResult(result);
}

function subtractMatrices() {
  const A = getMatrix('matrixA');
  const B = getMatrix('matrixB');
  if (!A || !B) return; // Hentikan jika input tidak valid

  const result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
  displayResult(result);
}

function multiplyMatrices() {
  const A = getMatrix('matrixA');
  const B = getMatrix('matrixB');
  if (!A || !B) return; // Hentikan jika input tidak valid

  const result = Array.from({ length: matrixOrder }, () =>
    Array(matrixOrder).fill(0)
  );
  for (let i = 0; i < matrixOrder; i++) {
    for (let j = 0; j < matrixOrder; j++) {
      for (let k = 0; k < matrixOrder; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  displayResult(result);
}

// Mengubah ordo matriks
function changeOrder(increment) {
  matrixOrder = Math.max(2, matrixOrder + increment); // Minimal ordo adalah 2
  createMatrixInputs('matrixA');
  createMatrixInputs('matrixB');

  document.getElementById('orderDisplay').textContent = matrixOrder;
}


// Menampilkan hasil transpose matriks
function displayTranspose(matrix, tableId) {
  const table = document.getElementById(tableId);
  table.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    table.querySelector('tbody').appendChild(row);
  }
}

// Fungsi menghitung transpose matriks
function transposeMatrix(matrix) {
  const transpose = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transpose.push([]);
    for (let j = 0; j < matrix.length; j++) {
      transpose[i].push(matrix[j][i]);
    }
  }
  return transpose;
}

// Operasi transpose untuk matriks A
function transposeMatrixA() {
  const A = getMatrix('matrixA');
  if (!A) return; // Hentikan jika input tidak valid

  const result = transposeMatrix(A);
  displayTranspose(result, 'resultMatrix');
}

// Operasi transpose untuk matriks B
function transposeMatrixB() {
  const B = getMatrix('matrixB');
  if (!B) return; // Hentikan jika input tidak valid

  const result = transposeMatrix(B);
  displayTranspose(result, 'resultMatrix');
}



function resetMatrix(tableId) {
  const inputs = document.querySelectorAll(`#${tableId} input`);
  inputs.forEach((input) => {
    input.value = ''; // Hapus nilai input
  });
}

function resetAllMatrices() {
  resetMatrix('matrixA');
  resetMatrix('matrixB');
  document.getElementById('resultMatrix').querySelector('tbody').innerHTML = ''; // Kosongkan tabel hasil
}




// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  createMatrixInputs('matrixA');
  createMatrixInputs('matrixB');
});
