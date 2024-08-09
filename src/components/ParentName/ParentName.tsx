interface Props {
  parentName: string | null;
  findSlug: (parentName: string | null) => string | undefined;
  getGenderClassName: (parentName: string | null) => string | undefined;
}

const unknownPerson = '-';

export const ParentName: React.FC<Props> = ({
  parentName,
  findSlug,
  getGenderClassName,
}) => (
  <td>
    {parentName ? (
      findSlug(parentName) ? (
        <a
          className={getGenderClassName(parentName)}
          href={`#/people/${findSlug(parentName)}`}
        >
          {parentName}
        </a>
      ) : (
        <span>{parentName}</span>
      )
    ) : (
      unknownPerson
    )}
  </td>
);
