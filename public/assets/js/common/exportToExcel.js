function Excel(idT, idA, fileName) {
    /* ����˵���� idT Ϊ�����id   idA :������id  fileNameΪ���صı���  ע��  idT��idAֱ��дid��ֵ ����
    д#do */
    var ok = document.querySelector('#' + idT + '').outerHTML;
    var html = "<html><head><meta charset='utf-8' //><//head><body>" + ok + "<//body><//html>";
    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
    var a = document.querySelector('#' + idA + '');
    a.href = URL.createObjectURL(blob);
    a.download = fileName + '.xls'
}