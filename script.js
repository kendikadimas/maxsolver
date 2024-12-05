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

// Fungsi untuk menghitung determinan matriks
function determinant(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0]; // Determinan matriks 1x1
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]; // Determinan matriks 2x2

  let det = 0;
  for (let i = 0; i < n; i++) {
    const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i)); // Sub-matriks tanpa baris pertama dan kolom ke-i
    det += matrix[0][i] * determinant(minor) * (i % 2 === 0 ? 1 : -1); // Alternating sign
  }
  return det;
}

// Fungsi untuk menghitung invers matriks
function inverse(matrix) {
  const n = matrix.length;
  const det = determinant(matrix);
  if (det === 0) {
    alert('Matriks tidak memiliki invers (determinannya 0).');
    return null;
  }

  // Matriks identitas
  const identity = Array.from({ length: n }, (_, i) => 
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  // Augment matriks dengan identitas
  const augmented = matrix.map((row, i) => [...row, ...identity[i]]);

  // Gauss-Jordan elimination
  for (let i = 0; i < n; i++) {
    // Pastikan elemen diagonal bukan nol
    if (augmented[i][i] === 0) {
      for (let j = i + 1; j < n; j++) {
        if (augmented[j][i] !== 0) {
          [augmented[i], augmented[j]] = [augmented[j], augmented[i]];
          break;
        }
      }
    }

    // Normalisasi baris
    const divisor = augmented[i][i];
    for (let j = 0; j < 2 * n; j++) {
      augmented[i][j] /= divisor;
    }

    // Eliminasi elemen di kolom yang sama
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = augmented[k][i];
      for (let j = 0; j < 2 * n; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }

  // Ekstrak invers dari matriks augment
  return augmented.map(row => row.slice(n));
}

// Fungsi untuk menghitung determinan dari Matriks A
function calculateDeterminantA() {
  const A = getMatrix('matrixA');
  if (!A) return; // Hentikan jika input tidak valid

  const det = determinant(A);
  alert(`Determinan Matriks A adalah: ${det}`);
}

// Fungsi untuk menghitung invers dari Matriks A
function calculateInverseA() {
  const A = getMatrix('matrixA');
  if (!A) return; // Hentikan jika input tidak valid

  const inv = inverse(A);
  if (inv) {
    displayResult(inv);
    alert('Invers Matriks A berhasil dihitung. Hasilnya ditampilkan.');
  }
}

// Fungsi untuk menghitung determinan dari Matriks B
function calculateDeterminantB() {
  const B = getMatrix('matrixB');
  if (!B) return; // Hentikan jika input tidak valid

  const det = determinant(B);
  alert(`Determinan Matriks B adalah: ${det}`);
}

// Fungsi untuk menghitung invers dari Matriks B
function calculateInverseB() {
  const B = getMatrix('matrixB');
  if (!B) return; // Hentikan jika input tidak valid

  const inv = inverse(B);
  if (inv) {
    displayResult(inv);
    alert('Invers Matriks B berhasil dihitung. Hasilnya ditampilkan.');
  }
}



// Mengubah ordo matriks
function changeOrder(increment) {
  const maxOrder = 8; // Batas maksimal ordo matriks
  matrixOrder = Math.min(maxOrder, Math.max(2, matrixOrder + increment)); // Minimal ordo 2, maksimal 8
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

// Event listener untuk Matriks A
document.getElementById('operationsA').addEventListener('change', (event) => {
  const selectedOperation = event.target.value;
  switch (selectedOperation) {
    case 'transpose':
      transposeMatrixA();
      break;
    case 'inverse':
      calculateInverseA();
      break;
    case 'determinant':
      calculateDeterminantA();
      break;
    default:
      alert('Operasi tidak valid.');
  }
  // Reset pilihan setelah operasi dilakukan
  event.target.selectedIndex = 0;
});

// Event listener untuk Matriks B
document.getElementById('operationsB').addEventListener('change', (event) => {
  const selectedOperation = event.target.value;
  switch (selectedOperation) {
    case 'transpose':
      transposeMatrixB();
      break;
    case 'inverse':
      calculateInverseB();
      break;
    case 'determinant':
      calculateDeterminantB();
      break;
    default:
      alert('Operasi tidak valid.');
  }
  // Reset pilihan setelah operasi dilakukan
  event.target.selectedIndex = 0;
});


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
