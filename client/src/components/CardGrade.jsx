const CardGrade = ({gradeId, gradeName, level}) => {
    return(
        <div class="max-w-sm rounded overflow-hidden shadow-lg" key={gradeId}>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{gradeName}</div>
    <p class="text-gray-700 text-base">
        {level}
      </p>
  </div>
</div>
    )
};

export default CardGrade;