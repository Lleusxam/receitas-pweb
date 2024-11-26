function gerarTabela(url, propriedades, cabecalhos, idElemento = "dadosDiv") {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro na requisição");
                }
                return res.json();
            })
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
                resolve(); 
            })
            .catch(err => {
                document.getElementById(idElemento).innerHTML = "Erro ao carregar dados.";
                reject(err); 
            });
    });
}

export { gerarTabela };
