<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Relatório de Transações</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .title {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th {
            background-color: #4F81BD;
            color: white;
            padding: 12px;
            text-align: left;
        }
        td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .total {
            margin-top: 20px;
            font-weight: bold;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">Relatório de Transações</div>
        <div class="date">Gerado em: {{ now()->format('d/m/Y H:i') }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Valor (R$)</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $transaction)
            <tr>
                <td>{{ $transaction['created_at'] }}</td>
                <td>{{ $transaction['description'] }}</td>
                <td>{{ $transaction['category'] }}</td>
                <td>{{ $transaction['type'] }}</td>
                <td>R$ {{ number_format((float)$transaction['value'], 2, ',', '.') }}</td>
                <td>{{ $transaction['status'] }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        Total de Registros: {{ count($transactions) }}
    </div>
</body>
</html>