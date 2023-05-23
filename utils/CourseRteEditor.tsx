import RteEditor from './RteEditor';

interface IRteEditor {
  content: string;
  onChange: any;
}

const CourseRteEditor = ({ content, onChange }: IRteEditor) => {
  return <RteEditor content={content} onChange={onChange} />;
};

export default CourseRteEditor;
