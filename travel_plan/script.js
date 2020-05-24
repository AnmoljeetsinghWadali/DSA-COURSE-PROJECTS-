onload = function () {
    // create a network
    const container = document.getElementById('container');
    const genNew = document.getElementById('generate-graph');
    // initialise graph options
    const options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 10
            }
        },
        nodes: {
            font: '12px arial ',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 50,
                color: '#991133',
            }
        }
    };
    // initialize your network!
    const network = new vis.Network(container);
    network.setOptions(options);



    function createData(){

        const cities = ['Amritsar', 'Patiala', 'Jalandhar', 'Chandigarh', 'Mohali', 'Delhi','Ludhiana','Khanna','Sirhind','Beas','Fatehgarh Sahib'];
        
    let V = 9;
    let E = [[0,1,4], [0,7,8], [1,7,11], [1,2,8], [7,8,7], [6,7,1], [2,8,2],
    [6,8,6], [5,6,2], [2,5,4], [2,3,7], [3,5,14], [3,4,9], [4,5,10]];
        //
     
        console.log(V);
              let vertices = [];
        for(let i=0;i<V;i++){
            vertices.push({id:i,label: cities[i]});
        }
        console.log(vertices);
        let edges = [];
        for(let i=0;i<E.length;i++){
            edges.push({from:E[i][0], to:E[i][1], color:'orange',label: String(E[i][2])});
        }


        /* //randomly genrate nodes and edges
        const V = Math.floor(Math.random() * cities.length)+3;
        let vertices = [];
        for(let i=1;i<=V;i++){
            vertices.push({id:i-1,label: cities[i-1]});
        }
        console.log(vertices);


        l=['orange','green','red','pink','black','yellow','red','gray','']

        let edges = [];
        for(let i=1;i<=V;i++){
            let neigh = Math.abs(Math.floor(Math.random()*i));
            if(i-1!=neigh)
            edges.push({from: i-1, to: neigh, color:l[Math.floor(Math.random()*l.length)],label: String(Math.floor(Math.random()*100)+30)});
        }*/
        console.log(edges);
        const data = {
            nodes: vertices,
            edges: edges
        };
        return data;
    }

    genNew.onclick = function () {
        let data = createData();
        network.setData(data);
    };

    genNew.click();
};