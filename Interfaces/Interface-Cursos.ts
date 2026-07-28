export interface ICourse {
  title: string;
  bgClass: string | null;
  imageUrl?: string | null;
}

export interface AbstractBackgroundProps {
  bgClass: string;
}

// Dados dos cursos com informações detalhadas
export interface CourseData extends ICourse {
  id: string;
  description: string;
  duration: string;
  modules: number;
  level: string;
  benefits: string[];
  hotmartLink: string;
}
