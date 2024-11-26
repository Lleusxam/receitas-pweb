function gerarTabela(url, propriedades, cabecalhos, idElemento = "dadosDiv") {
    fetch(url)
        .then(res => res.json())
        .then(dados => {
            const div = document.getElementById(idElemento);
            const table = `
                <table>
                    <thead>
                        <tr>${cabecalhos.map(cab => `<th>${cab}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${dados.map(item => `
                            <tr>
                                ${propriedades.map(prop => `<td>${item[prop] || 'N/A'}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            div.innerHTML = table;
        })
        .catch(err => {
            document.getElementById(idElemento).innerHTML = "Erro ao carregar dados.";
        });
}

export { gerarTabela };
