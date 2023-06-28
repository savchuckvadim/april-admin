import React from 'react';
import { useParams } from 'react-router-dom';



//https://www.typescriptlang.org/docs/handbook/utility-types.html
type WithRouterProps<P> = P & {
  params: ReturnType<typeof useParams>;
};

const WithRouter = <Props extends {}>(
  WrappedComponent: React.ComponentType<WithRouterProps<Props>>
): React.FC<Props> => {
  const WithRouterComponent: React.FC<Props> = (props: Props) => {
    // Вызовите хук useParams() внутри функционального компонента WithRouterComponent
    const params = useParams();

    return <WrappedComponent {...props} params={params} />;
  };

  return WithRouterComponent;
};

export default WithRouter;