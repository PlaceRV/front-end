import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://backend.anhvietnguyen.id.vn:2053/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	return {
		link: httpLink.create({ uri, withCredentials: true }),
		cache: new InMemoryCache(),
	};
}

@NgModule({
	exports: [ApolloModule],
	providers: [
		{ provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink] },
	],
})
export class GraphQLModule {}
